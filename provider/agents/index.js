/**
 * Builds the configured agent list.
 * @param {*} flows - Available agent flows
 * @param {*} adapterDB - Database adapter
 * @returns - Agents with their assigned flow
 */
const employees = async (flows, adapterDB) => {
  let listAgents = await adapterDB.getAgents(); // Loads agents from the database
  listAgents = listAgents.map((agent) => {
    // If agent.flows is numeric, use it as an index. Otherwise match by flow name.
    const flowIndex = parseInt(agent.flows);
    if (!isNaN(flowIndex)) {
      agent.flow = flows[flowIndex];
    } else {
      // Fallback to a lookup by flow name
      agent.flow = flows.find(f => f.name === agent.flows) || flows[0];
    }
    return agent;
  });
  console.log(listAgents); // Logs the resolved agents
  return listAgents; // Returns the agents with flows assigned
};

module.exports = { employees }; // Exports the employees helper
