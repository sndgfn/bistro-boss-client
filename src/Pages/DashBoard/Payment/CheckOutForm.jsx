import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
    const [error, setError] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [cart, refetch] = useCart();
    const navigate=useNavigate();

    // const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const totalPrice = Math.round(cart.reduce((total, item) => total + item.price, 0));

    
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    if (res.data?.clientSecret) {
                        setClientSecret(res.data.clientSecret);
                    } else {
                        console.error("Error: No clientSecret received", res.data);
                    }
                })
                .catch(error => console.error("Payment intent error:", error));
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            setError("Stripe is not loaded.");
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            setError("Card Element not found.");
            return;
        }

        // Ensure clientSecret is available before proceeding
        if (!clientSecret) {
            setError("Payment intent not initialized. Try again.");
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setError(error.message);
            return;
        } else {
            setError("");
            console.log('payment method', paymentMethod)
        }

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous",
                },
            },

        });

        if (confirmError) {
            onsole.log('payment intent', paymentIntent)
        } else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for the taka paisa",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/paymentHistory')
                }


                // try {
                //     const res = await axiosSecure.post('/payments', payment);
                //     console.log("Payment saved:", res.data);
                // } catch (saveError) {
                //     console.error("Error saving payment:", saveError);
                // }
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
                <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                {error && <p className="text-red-600">{error}</p>}
                {transactionId && <p className="text-green-600">Your transaction ID: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckOutForm;
