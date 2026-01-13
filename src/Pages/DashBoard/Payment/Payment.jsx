import { loadStripe } from "@stripe/stripe-js";
// import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
// import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const stripePromise = loadStripe('pk_test_51QneAGCSGs4CK9wyuXJTjfLWjNgm5tXTe79nI8s2IZSwlxXhmFA4RUi2wVs9XhFqsJ1JoAmkHszPMenudDhQnkv800ulUtQGv3');
const Payment = () => {
    return (
        <div>
            {/* <SectionTitle heading="Payment" subHeading="Please pay to eat"></SectionTitle> */}
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;