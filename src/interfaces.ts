export interface Device {
    id: number,
    name: string,
    nodes: Node[],
}

export interface Node {
    id: number,
    name: string,
}