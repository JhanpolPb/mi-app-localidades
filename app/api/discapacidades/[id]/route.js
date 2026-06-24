// app/api/discapacidades/[id]/route.js
import { NextResponse } from 'next/server';
import DiscapacidadModel from '../../../../models/discapacidadModel';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { NOMBRE_DISCAPACIDAD } = await request.json();
    await DiscapacidadModel.update(id, NOMBRE_DISCAPACIDAD);
    return NextResponse.json({ message: 'Discapacidad actualizada con éxito' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar discapacidad' }, { status: 500 });
  }
}
