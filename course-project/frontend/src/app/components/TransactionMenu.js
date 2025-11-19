
'use client';
import TagSelect from "./TagSelect";
import colors from "../constants/colors";
import PrimaryActionDropDownButton from "./PrimaryActionDropDownButton";
import { useRouter } from 'next/navigation';


  export default function TransactionMenu() {
    const router = useRouter();

    return (
        <PrimaryActionDropDownButton options={[
            {text: 'Transactions', action: () => router.push('/transaction')},
            {text: 'Transfer', action: () => router.push('/transaction/transfer')}, 
            {text: 'Redeem', action: ()=> router.push('/transaction/redeem')},
            {text: 'Purchase', action: ()=> router.push('/transaction/purchase')},
            {text: 'Process Redemption', action: ()=> router.push('/transaction/process')}]}/>
    );

    // get user role from the user context and add options accordingly

  }
