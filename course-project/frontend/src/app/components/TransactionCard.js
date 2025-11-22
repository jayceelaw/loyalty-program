'use client';

import { useRouter } from "next/navigation";
import { BackButton, PrimaryButton, SecondaryButton } from "./Button";
import styles from './TransactionCard.module.css'

    export default function TransactionCard({
        id,
        utorid,
        type,
        amount,
        remark,
        createdBy,
        // type specific fields
        promotionIds,
        spent,
        processed,
        relatedId, // redemption or adjustment
        eventId,
        sender,
        recipient,
        suspicious,
        hideAdjust,
        showAll

      }) {

      const router = useRouter();
      const promotions = promotionIds ? ['sample promotion', 'another promotion'] : [];

      // returns the section to display based on related data to each type
      function getHeader() {

         switch (type) {
          case 'purchase':
            return (
                <p><span className={styles.label}>Spent: $</span>{spent}</p>
            );
          case 'transfer':
            const relation = utorid === sender ? 'To: ' : 'From: ';
            const relatedUser = utorid === sender ? recipient : sender;
             return (
                <p><span className={styles.label}>{relation}</span>{relatedUser}</p>
            );
          case 'redemption':
            return (
                <p className={processed ? styles.processed : styles.pending }>{processed ? 'Processed' : 'Pending'}</p>
            );
          case 'adjustment':
             return (
                <p><span className={styles.label}>Transaction ID: </span>{relatedId}</p>
            );
          case 'event':
            return (
                <p><span className={styles.label}>Event ID: </span>{eventId}</p>
            );
          default:
            return;
        }

      }

    function getTypeStyle() {
       switch (type) {
          case 'purchase':
            return styles.purchase;
          case 'transfer':
            return styles.transfer;
          case 'redemption':
            return styles.redemption;
          case 'adjustment':
             return styles.adjustment;
          case 'event':
            return styles.event;
          default:
            return '';
        }
    }

     return (

      <div className={styles.container}>
        {/* header */}
        <div className={styles.header}>
          <p className={styles.id}>ID{id}</p>
          <p className={showAll ? '' : styles.hidden}>{utorid}</p>
          <div className={styles.typeContent}>
            {getHeader()}
          </div>
        </div>
        {/* main content */}
        <div className={styles.center}>
          <div className={styles.type + ' ' + getTypeStyle()}>{type}</div>
          <p className={styles.amount + ' ' + (amount < 0 ? styles.negative : styles.positive)}>
            {(amount > 0 ? '+' : '') + amount}
          </p>
          <div className={styles.buttons}>  {/* TODO: pass transaction id to adjust in context */}
             <div className={type === 'redemption' ? styles.qr : styles.hidden}>
              <PrimaryButton  text="Scan QR" onClick={()=> {
                localStorage.setItem("transactionID", id);
                router.push('transaction/redeemQr');
                }}/></div>
             <BackButton className={(showAll && !hideAdjust) ? '' : styles.hidden} text="Adjust"
              onClick={() => {
                localStorage.setItem("transactionID", id);
                router.push('transaction/adjust');
                }}/> 
          </div>
        </div>
        {/* promotions */}
        <div className={styles.promotions}>
          {promotions.map((p, index) => 
          <p className={styles.promotion} key={index}>{p}</p>
          )}
        </div>
        <p className={styles.remark}>{remark}</p>
        {/* footer */}
          <div className={styles.footer}>
            <p className={styles.creator}>Created by {createdBy}</p>
            <p className={styles.suspicious + ' ' + 
                        (showAll ? '' : styles.hidden)}>{suspicious ? 'Suspicious' : ''}</p>
          </div>
      </div>
      
      
    );
    
  }
    