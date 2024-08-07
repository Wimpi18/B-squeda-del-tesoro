import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/mongodb'; // Asegúrate de implementar esta función

export async function POST(request) {
    try {
        const data = await request.json();
        const { patrulla, code, timestamp } = data;

        // Conéctate a tu base de datos (MongoDB en este ejemplo)
        const { db } = await connectToDatabase();
        const collection = db.collection('verifications');

        // Inserta el nuevo documento
        await collection.insertOne({ patrulla, code, timestamp });

        return NextResponse.json({ message: 'Data saved successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}