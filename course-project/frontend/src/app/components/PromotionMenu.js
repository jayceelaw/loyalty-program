'use client';

import PrimaryActionDropDownButton from "./PrimaryActionDropDownButton";
import { useRouter } from 'next/navigation';


  export default function TransactionMenu() {
    const router = useRouter();

    return (
        <PrimaryActionDropDownButton options={[
            {text: 'Promotions', action: () => router.push('/promotion')},
            {text: 'Create Promotion', action: () => router.push('/promotion/create')}, 
            {text: 'Update Promotion', action: ()=> router.push('/promotion/update')}]}/>
    );

    // get user role from the user context and add options accordingly

  }
