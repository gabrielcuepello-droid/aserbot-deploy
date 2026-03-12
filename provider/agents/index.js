/**
 * Lista de agentes
 * @param {*} flows - Flujos de agentes
 * @param {*} adapterDB - Adaptador de base de datos
 * @returns - Lista de agentes con flujos asignados
 */
const employees = async (flows, adapterDB) => {
  let listAgents = await adapterDB.getAgents(); // Obtiene la lista de agentes desde la base de datos
  listAgents = listAgents.map((agent) => {
    // Si agent.flows es un número, lo usamos como índice. Si no, buscamos por nombre de flujo
    const flowIndex = parseInt(agent.flows);
    if (!isNaN(flowIndex)) {
      agent.flow = flows[flowIndex];
    } else {
      // Intenta encontrar el flujo por el nombre (opcional, por si acaso)
      agent.flow = flows.find(f => f.name === agent.flows) || flows[0];
    }
    return agent;
  });
  console.log(listAgents); // Imprime la lista de agentes en la consola
  return listAgents; // Devuelve la lista de agentes con flujos asignados
};

module.exports = { employees }; // Exporta la función 'employees'
