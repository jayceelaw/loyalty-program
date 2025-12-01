#!/usr/bin/env node
'use strict'; 

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// create pending notification when user is offline
const storeNotification = async (utorid, message) => {
    
    const user = await prisma.user.findUnique({ where: { utorid: utorid }});

    if (!user) {
        throw new Error("User does not exist.");
    }
    
    const result = await prisma.Notification.create({ 
        data: {utorid: utorid, message: message, time: new Date()}
    })

    return result;

};

const clearNotifications = async (utorid) => {
    try {
        console.log("clearing", utorid);
        await prisma.notification.deleteMany({where: { utorid: utorid }})
    }
    catch (err) {
        console.log(err.message);
    }

}

const retrieveNotifications = async (utorid, page, limit) => {
    try {
        const result = await prisma.notification.findMany({ 
            where: { utorid: utorid },
            take: limit,
            skip: (page - 1) * limit,
            orderBy: { time: 'desc'}
        });
        return result;
        
    }
    catch (err) {
        console.log(err.message);
    }

}

const viewNotification = async (id) => {
    try {
        await prisma.notification.update({ 
            data: { seen: true },
            where: { id: id}
        });
    }
    catch (err) {
        console.log(err.message);
    }

}

const countUnseen = async (utorid) => {
    try {
        const result = await prisma.notification.count({ 
            where: { utorid: utorid, seen: false }
        });
        return result;
        
    }
    catch (err) {
        console.log(err.message);
    }

}

module.exports = { storeNotification,
                   clearNotifications,
                   retrieveNotifications,
                   viewNotification,
                   countUnseen };