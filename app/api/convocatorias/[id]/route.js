// app/api/convocatorias/[id]/route.js
import { NextResponse } from 'next/server';
import ConvocatoriaModel from '../../../../models/convocatoriaModel';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { NOMBRE_CONVOCATORIA } = await request.json();
    await ConvocatoriaModel.update(id, NOMBRE_CONVOCATORIA);
    return NextResponse.json({ message: 'Convocatoria actualizada con éxito' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar convocatoria' }, { status: 500 });
  }
}
