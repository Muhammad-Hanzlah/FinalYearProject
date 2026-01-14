const stripe = require('stripe')("sk_test_51SnHBkCtxpb4SCTkAjJ2N8S4rj1Q4RFC7r2RaZbT3aQX5ExTK5gvF378FevQjMH1Lo0csP1zaGCahNWncmhmL2Qu001aOuckZa");

const payment = async (paymentMethodId, amount) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'pkr',
            payment_method: paymentMethodId, 
            confirm: true,
            automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
            return_url: "https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app"
        });
        return paymentIntent;
    } catch (error) { throw error; }
}
module.exports = payment;