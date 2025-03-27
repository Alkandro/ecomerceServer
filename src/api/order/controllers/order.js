// "use strict";

// // Asegurate de tener stripe instalado y funcionando
// const Stripe = require("stripe");
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Usa variable de entorno

// const { createCoreController } = require("@strapi/strapi").factories;

// function calcDiscountPrice(price, discount) {
//   if (!discount) return price;
//   const discountAmount = (price * discount) / 100;
//   return (price - discountAmount).toFixed(2);
// }

// module.exports = createCoreController("api::order.order", ({ strapi }) => ({
//   async paymentOrder(ctx) {
//     try {
//       const { token, products, userId, addressShipping } = ctx.request.body;

//       let totalPayment = 0;
//       products.forEach((product) => {
//         const priceTemp = calcDiscountPrice(product.price, product.discount);
//         totalPayment += Number(priceTemp) * product.quantity;
//       });

//       const charge = await stripe.charges.create({
//         amount: Math.round(totalPayment * 100),
//         currency: "eur",
//         source: token,
//         description: `User ID: ${userId}`,
//       });

//       const data = {
//         products,
//         user: userId,
//         totalPayment,
//         idPayment: charge.id,
//         addressShipping,
//       };

//       const model = strapi.contentTypes["api::order.order"];
//       const validData = await strapi.entityValidator.validateEntityCreation(
//         model,
//         data
//       );

//       const entry = await strapi.db.query("api::order.order").create({
//         data: validData,
//       });

//       return entry;
//     } catch (error) {
//       console.error("Stripe payment error:", error);
//       ctx.throw(500, "Error al procesar el pago");
//     }
//   },
// }));


// "use strict";

// const { createCoreController } = require("@strapi/strapi").factories;

// function calcDiscountPrice(price, discount) {
//   if (!discount) return price;
//   const discountAmount = (price * discount) / 100;
//   return (price - discountAmount).toFixed(2);
// }

// module.exports = createCoreController("api::order.order", ({ strapi }) => ({
//   async paymentOrder(ctx) {
//     try {
//       const { token, products, userId, addressShipping } = ctx.request.body;

//       let totalPayment = 0;
//       products.forEach((product) => {
//         const priceTemp = calcDiscountPrice(product.price, product.discount);
//         totalPayment += Number(priceTemp) * product.quantity;
//       });

//       // Lógica de pago alternativa o simulada en lugar de Stripe
//       const charge = { id: "dummy_charge_id" };

//       const data = {
//         products,
//         user: userId,
//         totalPayment,
//         idPayment: charge.id,
//         addressShipping,
//       };

//       const model = strapi.contentTypes["api::order.order"];
//       const validData = await strapi.entityValidator.validateEntityCreation(
//         model,
//         data
//       );

//       const entry = await strapi.db.query("api::order.order").create({
//         data: validData,
//       });

//       return entry;
//     } catch (error) {
//       console.error("Error de pago:", error);
//       ctx.throw(500, "Error al procesar el pago");
//     }
//   },
// }));
"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

function calcDiscountPrice(price, discount) {
  if (!discount) return price;
  const discountAmount = (price * discount) / 100;
  return (price - discountAmount).toFixed(2);
}

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async paymentOrder(ctx) {
    try {
      const { token, products, userId, addressShipping } = ctx.request.body;

      let totalPayment = 0;
      products.forEach((product) => {
        const priceTemp = calcDiscountPrice(product.price, product.discount);
        totalPayment += Number(priceTemp) * product.quantity;
      });

      // Lógica de pago alternativa o simulada en lugar de Stripe
      const charge = { id: "dummy_charge_id" };

      const data = {
        products,
        user: userId,
        totalPayment,
        idPayment: charge.id,
        addressShipping,
      };

      // Usamos el entityService en lugar de entityValidator y db.query
      const entry = await strapi.entityService.create("api::order.order", {
        data,
      });

      return entry;
    } catch (error) {
      console.error("Error de pago:", error);
      ctx.throw(500, "Error al procesar el pago");
    }
  },
}));
