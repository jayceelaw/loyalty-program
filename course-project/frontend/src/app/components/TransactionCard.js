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
        event,
        sender,
        recipient,
        suspicious,
        hideAdjust,
        showAll

      }) {

      const router = useRouter();
      const promotions = promotionIds ? promotionIds.map(p => p.name) : [];

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
                <p className={styles.eventName}>{event?.name}</p>
            );
          default:
            return;
        }

      }

    function getTypeStyle() {
       switch (type) {
          case 'purchase':
            return styles.purchase + ' ' + styles.tagButton;
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

    function capitalize(str) {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

     return (

      <div className={styles.container + ' ' + (showAll && !hideAdjust ? styles.hoverable : '')} onClick={() => {
                if (!showAll || hideAdjust) return;
                  router.push(`/transaction/adjust?transactionId=${id}`);
                }}>
        {/* header */}
        <div className={styles.header}>
          <p className={styles.id}>ID{id}</p>
          {showAll && <p>{utorid}</p>}
          <div className={styles.typeContent}>
            {getHeader()}
          </div>
        </div>
        {/* main content */}
        <div className={styles.center}>
          <div className={styles.type + ' ' + getTypeStyle()}>{capitalize(type)}</div>
          <p className={styles.amount + ' ' + (amount < 0 ? styles.negative : styles.positive)}>
            {(amount > 0 ? '+' : '') + amount}
          </p>
          <div className={styles.buttons}> 
             <div className={type === 'redemption' ? styles.qr : styles.hidden}>
              <button className={styles.scan} onClick={(e)=> {
                  e.stopPropagation(); // prevent clicking to adjust transaction
                  router.push(`/transaction/redeemQr?transactionId=${id}`);
                }}>Scan QR
              </button>
           </div>
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
            {showAll && <p className={styles.suspicious}>{suspicious ? 'Suspicious' : ''}</p>}
          </div>
      </div>
    );
  }
    