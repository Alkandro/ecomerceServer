"use strict";
const stripe = require("stripe")(
  "sk_test_51Oy29gJFy3WXe3s6SFNyPkwMa8UruthepU0VQPryUPEpdpYy4wfZ21XCYxZfU4TsmUBojAk1zhy4SiuVUkx4Zsks00KFJo3hx4"
);

function calcDiscountPrice(price, discount) {
  if (!discount) return price;

  const discountAmount = (price * discount) / 100;
  const result = price - discountAmount;

  return result.toFixed(2);
}

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async paymentOrder(ctx) {
    const { token, products, userId, addressShipping } = ctx.request.body;

    let totalPayment = 0;
    products.forEach((product) => {
      const priceTemp = calcDiscountPrice(product.price, product.discount);
      totalPayment += Number(priceTemp) * product.quantity;
    });

    const charge = await stripe.charges.create({
      amount: Math.round(totalPayment * 100),
      currency: "eur",
      source: token,
      description: `User ID: ${userId}`,
    });

    const data = {
      products,
      user: userId,
      totalPayment,
      idPayment: charge.id,
      addressShipping,
    };

    const model = strapi.contentTypes["api::order.order"];
    const validData = await strapi.entityValidator.validateEntityCreation(
      model,
      data
    );

    const entry = await strapi.db
      .query("api::order.order")
      .create({ data: validData });

    return entry;
  },
}));











