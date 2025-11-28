
'use client';
import TagSelect from "./TagSelect";
import colors from "../constants/colors";
// import PrimaryActionDropDownButton from "./PrimaryActionDropDownButton";
import NavDropDownButton from "./NavDropDownButton";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext.jsx';

  export default function TransactionMenu({ className = '' }) {
    const router = useRouter();
    const { currentInterface } = useAuth();

    let menuOptions = [{text: 'Transactions', action: () => router.push('/transaction')},
                        {text: 'Transfer', action: () => router.push('/transaction/transfer')}, 
                        {text: 'Redeem', action: ()=> router.push('/transaction/redeem')}];

    if (currentInterface === "cashier" || currentInterface === "manager" || currentInterface === "superuser") {
      menuOptions.push({text: 'Purchase', action: ()=> router.push('/transaction/purchase')});
      menuOptions.push({text: 'Process Redemption', action: ()=> router.push('/transaction/process')});
    }

    return (
        <div className={className}>
            <Link href="/transaction"></Link>
            <NavDropDownButton options={menuOptions}/>
        </div>
    );

    // get user role from the user context and add options accordingly

  }
