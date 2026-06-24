// app/api/sexos/route.js
import { NextResponse } from 'next/server';
import SexoModel from '../../../models/sexoModel';

export async function GET() {
  try {
    const data = await SexoModel.getAll();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener registros de sexo' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { NOMBRE_SEXO } = await request.json();
    await SexoModel.create(NOMBRE_SEXO);
    return NextResponse.json({ message: 'Registro de sexo creado con éxito' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear registro de sexo' }, { status: 500 });
  }
}
