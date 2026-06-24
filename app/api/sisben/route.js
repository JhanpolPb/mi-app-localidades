// app/api/sisben/route.js
import { NextResponse } from 'next/server';
import SisbenModel from '../../../models/sisbenModel';

export async function GET() {
  try {
    const data = await SisbenModel.getAll();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener registros de SISBEN' }, { status: 500 });
  }
}
