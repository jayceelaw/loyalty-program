'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';
import styles from '../user.module.css';
import Button from '../../components/Button';
import PrimaryActionDropDownButton from '../../components/PrimaryActionDropDownButton';

export default function UserView() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [reachedEnd, setReachedEnd] = useState(false);
    const [roleFilter, setRoleFilter] = useState(null); 
    const [verifiedFilter, setVerifiedFilter] = useState(null);
    const [activatedFilter, setActivatedFilter] = useState(null);
    const { token } = useAuth();
    let loading = false;
    const limit = 5;
    const roles = ['regular', 'cashier', 'manager', 'superuser'];
    const BACKEND_BASE = process.env.NEXT_PUBLIC_API_URL; // idk why this is needed here

    const fetchUsers = async (p = 1) => {
        if (loading) { // prevent fetching twice
            return;
        } else {
            loading = true;
        }

        // creating filters for backend 
        let params = "";
        if (roleFilter && roleFilter !== '') params += "role=" + roleFilter;
        if (verifiedFilter) params += (params ? '&' : '') + "verified=" + verifiedFilter;
        if (activatedFilter) params += (params ? '&' : '') + "activated=" + activatedFilter;
        params += (params ? '&' : '') + "page=" + p;
        params += "&limit=" + limit;

        const res = await fetch(`/users?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        });
        const data = await res.json();

        if (!res.ok) { // should not happen
            console.log(data?.message || `Error: ${res.status}`);
            loading = false;
            return;
        }

        setUsers(prev => [...prev, ...data.results])
        setReachedEnd(users.length >= data.count);
        setPage(p + 1);
        loading = false;
    };

    // fetch users everytime filter changes
    useEffect(() => {
        setUsers([]);
        setPage(1);
        setReachedEnd(false);
        if (users.length === 0 && token) {
            fetchUsers(1);
        }
    }, [token, roleFilter, verifiedFilter, activatedFilter]);

    // for infinite scroll
    const handleScroll = (e) => {
        const target = e.target;
        const atBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 100;
        if (atBottom && !reachedEnd && !loading) {
            fetchUsers(page);
        }
    };

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
                    <div className={styles.userList} onScroll={handleScroll}>
                        {users.map(u => {
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

                        {users.length === 0 && <div className={styles.empty}>No users found</div>}
                        {reachedEnd && users.length > 0 && <div className={styles.subtitle} style={{ textAlign: "center" }} >No more users</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}