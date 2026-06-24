// app/api/grupos-etnicos/route.js
import { NextResponse } from 'next/server';
import GrupoEtnicoModel from '../../../models/grupoEtnicoModel';

export async function GET() {
  try {
    const data = await GrupoEtnicoModel.getAll();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener grupos étnicos' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { NOMBRE_GRUPO_ETNICO } = await request.json();
    await GrupoEtnicoModel.create(NOMBRE_GRUPO_ETNICO);
    return NextResponse.json({ message: 'Grupo étnico creado con éxito' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear grupo étnico' }, { status: 500 });
  }
}
