import { prisma } from "../../config/prisma.js";
import { CreatePurchaseOrderInput, ReceivePurchaseOrderInput } from "./purchase-order.validator.js";

export const purchaseOrderRepository = {
  findMany: () =>
    prisma.purchaseOrder.findMany({
      include: {
        supplier: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),

  create: (data: CreatePurchaseOrderInput) => {
    const totalAmount = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

    return prisma.purchaseOrder.create({
      data: {
        supplierId: data.supplierId,
        poNumber: data.poNumber ?? `PO-${Date.now()}`,
        expectedDate: data.expectedDate ? new Date(data.expectedDate) : undefined,
        totalAmount,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            lineTotal: item.quantity * item.unitPrice,
          })),
        },
      },
      include: {
        supplier: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  },

  receive: (purchaseOrderId: string, data: ReceivePurchaseOrderInput) =>
    prisma.$transaction(async (tx) => {
      const purchaseOrder = await tx.purchaseOrder.findUniqueOrThrow({
        where: { id: purchaseOrderId },
        include: { items: true },
      });

      const receipt = await tx.goodsReceipt.create({
        data: {
          purchaseOrderId,
          receiptNumber: data.receiptNumber ?? `GR-${Date.now()}`,
          remarks: data.remarks,
          items: {
            create: data.items.map((item) => ({
              productId: item.productId,
              locationId: data.locationId,
              quantity: item.quantity,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      for (const item of data.items) {
        const orderItem = purchaseOrder.items.find((poItem) => poItem.productId === item.productId);
        if (!orderItem) continue;

        await tx.purchaseOrderItem.update({
          where: { id: orderItem.id },
          data: {
            receivedQty: {
              increment: item.quantity,
            },
          },
        });

        await tx.stock.upsert({
          where: {
            productId_locationId: {
              productId: item.productId,
              locationId: data.locationId,
            },
          },
          create: {
            productId: item.productId,
            locationId: data.locationId,
            quantity: item.quantity,
          },
          update: {
            quantity: {
              increment: item.quantity,
            },
          },
        });

        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            locationId: data.locationId,
            movementType: "IN",
            quantity: item.quantity,
            referenceType: "GOODS_RECEIPT",
            referenceId: receipt.id,
            remarks: data.remarks,
          },
        });
      }

      const updatedItems = await tx.purchaseOrderItem.findMany({ where: { purchaseOrderId } });
      const allReceived = updatedItems.every((item) => Number(item.receivedQty) >= Number(item.quantity));
      const anyReceived = updatedItems.some((item) => Number(item.receivedQty) > 0);

      await tx.purchaseOrder.update({
        where: { id: purchaseOrderId },
        data: {
          status: allReceived ? "RECEIVED" : anyReceived ? "PARTIAL_RECEIVED" : purchaseOrder.status,
        },
      });

      return receipt;
    }),
};
