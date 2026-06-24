// app/api/beneficiarios/route.js
import { NextResponse } from 'next/server';
import BeneficiarioModel from '../../../models/beneficiarioModel';

export async function GET() {
  try {
    const data = await BeneficiarioModel.getAll();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener beneficiarios' }, { status: 500 });
  }
}
