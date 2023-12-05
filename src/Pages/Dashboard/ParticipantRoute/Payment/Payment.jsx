
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import SectionHeading from '../../../../Components/sectionHeading';
import PaymentForm from './PaymentForm';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// TODO : add key

const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK)
const Payment = () => {
    const {id} = useParams()

    return (
        <div>
            <Helmet><title>MediCamp | Payment Form</title></Helmet>
            <SectionHeading heading={'Payment Form'} ></SectionHeading>
            <div>
               <Elements stripe={stripePromise} >
                    <PaymentForm id={id} ></PaymentForm>
               </Elements>
            </div>
        </div>
    );
};

export default Payment;