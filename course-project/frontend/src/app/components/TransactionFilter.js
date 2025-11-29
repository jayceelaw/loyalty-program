'use client';
import TagSelect from './TagSelect';
import styles from './TransactionFilter.module.css';
import colors from '../constants/colors';
import { useState } from 'react';
import { PrimaryButton } from './Button';
import { useRouter } from 'next/navigation';

export default function TransactionFilter({showAll}) {

    const router = useRouter();
    const clearance = showAll ? '' : styles.hidden;

    const [ type, setType ] = useState('');
    const [ id, setId ] = useState('');
    const [ amount, setAmount ] =useState('');
    const [ operator, setOperator ] = useState('gte');
    const [ promotionID, setPromotionID] = useState('');
    const [ relatedID, setRelatedID ] = useState('');
    const [ owner, setOwner ] = useState('');
    const [ creator, setCreator ] = useState('');
    const [ suspicious, setSuspicious ] = useState('');
    
    const typeOptions = [
        {
          text: 'All types',
          backgroundColour: colors.primaryBrown,
          action: () => setType(''),
        },
        {
          text: 'Purchase',
          backgroundColour: colors.primaryOrange,
          action: () => setType('purchase'),
        },
        {
          text: 'Transfer',
          backgroundColour: colors.primaryYellow,
          action: () => setType('transfer'),
        },
        {
          text: 'Redemption',
          backgroundColour: colors.primaryPurple,
          action: () => setType('redemption'),
        },
        {
          text: 'Event',
          backgroundColour: colors.primaryBlueDark,
          action: () => setType('event'),
        },
        {
          text: 'Adjustment',
          backgroundColour: colors.primaryRed,
          action: () => setType('adjustment'),
        },
    ];

    const operatorOptions = [
        {
          text: '>=',
        //   backgroundColour: colors.primaryOrange,
          action: () => setOperator('gte'),
        },
        {
          text: '<=',
        //   backgroundColour: colors.primaryYellow,
          action: () => setOperator('lte'),
        },
    ];

    const suspiciousOptions = [
        {
          text: 'All Suspicions',
        //   backgroundColour: colors.primaryOrange,
          action: () => setSuspicious(''),
        },
        {
          text: 'Suspicious',
          backgroundColour: colors.primaryRed,
          action: () => setSuspicious(true),
        },
        {
          text: 'Not Suspicious',
          backgroundColour: colors.primaryGreen,
          action: () => setSuspicious(false),
        },
    ];
    
    const applyFilter = () => {
      const filters = {
        type: type,
        id: id,
        amount: amount, 
        operator: operator, 
        promotionId: promotionID,
        relatedId: relatedID,
        utorid: owner, 
        createdBy: creator, 
        suspicious: suspicious
      };

      const params = new URLSearchParams();

      // clean filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          params.set(key, value);
        }
      });

    router.replace(`?${params.toString()}`);
    };

    const clearFilters = () => {
      setAmount('');
      setPromotionID('');
      setRelatedID('');
      setOwner('');
      setCreator('');
    }

    return (
        <div className={styles.container}>
            <TagSelect 
                type="rounded"
                backgroundColour={colors.primaryBrown}
                defaultText={'All types'}
                options={typeOptions}
              />
              <TagSelect 
                type="rounded"
                backgroundColour={colors.primaryBrown}
                defaultText={'>='}
                options={operatorOptions}
              />
              <div className={clearance}>
                <TagSelect 
                type="rounded"
                backgroundColour={colors.primaryBrown}
                defaultText={'All Suspicions'}
                options={suspiciousOptions}
              />
              </div>
            <label className={styles.label}>ID: </label>
            <input className={styles.id} type='text' value={id} 
                onChange={e=>(setId(e.target.value))}></input>
            <label className={styles.label}>Amount: </label>
            <input className={styles.amount} type='text' value={amount}
                onChange={e=>(setAmount(e.target.value))}></input>
            <label className={styles.label}>PromotionID: </label>
            <input className={styles.id} type='text'
                onChange={e=>(setPromotionID(e.target.value))}></input>
            <label className={styles.label}>RelatedID: </label>
            <input className={styles.id} type='text' value={relatedID}
                onChange={e=>(setRelatedID(e.target.value))}></input>

            {/* Manager only options depending on showAll*/}
            <label className={styles.label  + ' ' + clearance}>UTORid: </label>
            <input className={styles.name + ' ' + clearance} type='text' value={owner}
                onChange={e=>(setOwner(e.target.value))}></input>
            <label className={styles.label + ' ' + clearance}>Creator: </label>
            <input className={styles.name + ' ' + clearance} type='text' value={creator}
                onChange={e=>(setCreator(e.target.value))}></input>
            <PrimaryButton text="Filter" onClick={applyFilter}/>
            <button className={styles.clear} onClick={clearFilters} >Clear</button>
        </div>
    );
}
