'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';
import styles from '../user.module.css';
import Button from '../../components/Button';
import PrimaryActionDropDownButton from '../../components/PrimaryActionDropDownButton';

export default function UserView() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 20;
    const [hasMore, setHasMore] = useState(true);
    const [roleFilter, setRoleFilter] = useState(null); 
    const [verifiedFilter, setVerifiedFilter] = useState(null);
    const [activatedFilter, setActivatedFilter] = useState(null);
    const observerRef = useRef(null);
    const { token } = useAuth();
    const BACKEND_BASE = process.env.NEXT_PUBLIC_API_URL || ''; // e.g. http://localhost:3001

    const fetchUsers = async () => {
        // creating filters for backend 
        let params = "";
        if (roleFilter && roleFilter !== '') {
            params += "role=" + roleFilter
        }
        if (verifiedFilter) {
            params += "&verified=" + verifiedFilter
        }
         if (activatedFilter) {
            params += "&activated=" + activatedFilter
        }
        console.log(params);

        // params.append('page', String(p));
        // params.append('limit', String(limit));

        const res = await fetch(`/users?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        });
        const data = await res.json()
        console.log(data)

        if (!res.ok) { // should not happen
            console.log(data?.message || `Error: ${res.status}`);
            return;
        }

        setUsers(data.results);

        // setHasMore(received.length === limit);
        // setPage(p);
    };

    // fetch users everytime filter changes
    useEffect(() => {
        fetchUsers();
        // setUsers([]);
        // setPage(1);
        // setHasMore(true);
        
    }, [token, roleFilter, verifiedFilter, activatedFilter]);


    const roles = ['regular', 'cashier', 'manager', 'superuser'];

    const toggleRole = (r) => {
        setRoleFilter(prev => (prev === r ? null : r));
    };

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.title}>Users</h1>

            <div className={styles.filters}>
                <span className={styles.subtitle}>Filters:</span>

                {/* roles filter */}
                <div className={styles.roleFilterGroup} role="tablist" aria-label="Role filters">
                    {roles.map(r => (
                        <Button
                            key={r}
                            variant="secondary"
                            className={`${styles.roleFilterBtn} ${roleFilter === r ? styles.roleFilterActive : ''}`}
                            onClick={() => toggleRole(r)}
                        >
                            {r}
                        </Button>
                    ))}
                </div>

                {/* verified filter */}
                <div className={styles.filterItem}>
                    <label className={styles.filterLabel}>Verified:</label>
                    <PrimaryActionDropDownButton
                        options={[
                            verifiedFilter == null
                                ? { text: 'Any', action: () => setVerifiedFilter(null) }
                                : verifiedFilter === 'true'
                                ? { text: 'Verified', action: () => setVerifiedFilter('true') }
                                : { text: 'Not verified', action: () => setVerifiedFilter('false') },

                            { text: 'Any', action: () => setVerifiedFilter(null) },
                            { text: 'Verified', action: () => setVerifiedFilter('true') },
                            { text: 'Not verified', action: () => setVerifiedFilter('false') },
                        ]}
                        className={styles.filterDropDown}
                    />
                </div>

                {/* activated filter */}
                <div className={styles.filterItem}>
                    <label className={styles.filterLabel}>Activated:</label>
                    <PrimaryActionDropDownButton
                        options={[
                            activatedFilter == null
                                ? { text: 'Any', action: () => setActivatedFilter(null) }
                                : activatedFilter === 'true'
                                ? { text: 'Activated', action: () => setActivatedFilter('true') }
                                : { text: 'Not activated', action: () => setActivatedFilter('false') },

                            { text: 'Any', action: () => setActivatedFilter(null) },
                            { text: 'Activated', action: () => setActivatedFilter('true') },
                            { text: 'Not activated', action: () => setActivatedFilter('false') },
                        ]}
                        className={styles.filterDropDown}
                    />
                </div>
            </div>
            <div className={styles.resultsContainer}>
                <div className={styles.resultsCard}>
                    <div className={styles.userList}>
                        {users.map(u => {
                            // normalize avatar URL: prefer absolute; if relative prefix backend base; fallback to public svg
                            let avatarSrc = '/Friend Symbol.svg';
                            if (u?.avatarUrl) {
                                if (/^https?:\/\//i.test(u.avatarUrl)) {
                                    avatarSrc = u.avatarUrl;
                                } else if (u.avatarUrl.startsWith('/')) {
                                    // if backend base is provided, prefix it; otherwise assume same origin
                                    avatarSrc = BACKEND_BASE ? `${BACKEND_BASE}${u.avatarUrl}` : u.avatarUrl;
                                } else {
                                    // a bare filename or relative path
                                    avatarSrc = BACKEND_BASE ? `${BACKEND_BASE}/${u.avatarUrl}` : `/${u.avatarUrl}`;
                                }
                            }

                            return (
                                <div key={u.id} className={styles.userCard}>
                                    <div className={styles.userId}>ID {String(u.id)}</div>

                                    {(() => {
                                        const map = {
                                            regular: styles.roleRegular,
                                            cashier: styles.roleCashier,
                                            manager: styles.roleManager,
                                            superuser: styles.roleSuperuser,
                                        };
                                        const roleKey = u.role;
                                        const roleClass = map[roleKey];
                                        return <div className={`${styles.roleBadge} ${roleClass}`}>{roleKey}</div>;
                                    })()}

                                    <img src={avatarSrc} className={styles.avatar} alt={`${u.name ?? u.email} avatar`} />

                                    <div className={styles.userMain}>
                                        <div className={styles.userHeader}>
                                            <div className={styles.userName}>{u.name ?? '—'}</div>
                                            {u.verified && <span className={styles.verifiedBadge}>Verified</span>}
                                        </div>

                                        <div className={styles.userEmail}>{u.email ?? ''}</div>

                                        <div className={styles.userMeta}>
                                            <div>Birthday: <strong>{u.birthday ? new Date(u.birthday).toLocaleDateString() : '—'}</strong></div>
                                            <div className={styles.points}>
                                                Points:
                                                <span className={u.points > 1000 ? styles.pointsHigh : u.points > 100 ? styles.pointsMed : styles.pointsLow} style={{ marginLeft: 6 }}>
                                                    {u.points ?? 0}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.userActions}>
                                        <Button type="button" variant="secondary" className={styles.showMoreBtn} onClick={() => { /* TODO */ }}>
                                            Edit User Info
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}

                        <div ref={observerRef} style={{ height: 1 }} />

                        {users.length === 0 && <div className={styles.empty}>No users found</div>}
                        {users.length > 0 && <div className={styles.subtitle} style={{ textAlign: "center" }} >No more users</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}