'use client';
import TransactionCard from '../components/TransactionCard';
import TransactionFilter from '../components/TransactionFilter';

export default function TransactionsListPage() {

  // TODO: call api and implment infinite scroll
  return (
    <div className='main-container'>
      <h1>My Promotions</h1>
        <TransactionFilter/>
        <div className='infinite-scroll'>
          <TransactionCard id={1} remark="good deal" amount={20} type='purchase' promotionIds={1} spent={5} />
          <TransactionCard id={2} type='transfer' remark="pizza" amount={-15} utorid={'abcd123'} sender={'abcd123'} recipient={'plmn0987'} />
          <TransactionCard id={3} type='redemption' suspicious={true} amount={-20} redeemed={true}/>
          <TransactionCard id={4} type='adjustment' amount={5} relatedId={2}/>
          <TransactionCard id ={5} type='event' amount={10} relatedId={3}/>
          <TransactionCard id={1} remark="good deal" createdBy='joe999' amount={20} type='purchase' promotionIds={1} spent={5} />
          <TransactionCard id={2} type='transfer' remark="pizza" amount={-15} utorid={'abcd123'} sender={'abcd123'} recipient={'plmn0987'} />
          <TransactionCard id={3} type='redemption' suspicious={true} amount={-20} redeemed={true}/>
          <TransactionCard id={4} type='adjustment' amount={5} relatedId={2}/>
          <TransactionCard id ={5} type='event' amount={10} relatedId={3}/>
          <p>No more transactions.</p>
        </div>
        
    </div>
  );
}
