#!/usr/bin/env node

/**
 * PathFinder Application - Using Dijkstra's Algorithm
 * 
 * This application demonstrates Dijkstra's shortest path algorithm
 * in a practical scenario: finding the optimal route between locations
 * in a delivery network or city navigation system.
 */

class Graph {
    constructor() {
        this.nodes = new Map();
        this.edges = new Map();
    }

    addNode(name, coordinates = { x: 0, y: 0 }) {
        this.nodes.set(name, {
            name,
            coordinates,
            distance: Infinity,
            visited: false,
            previous: null
        });
    }

    addEdge(from, to, weight) {
        if (!this.edges.has(from)) {
            this.edges.set(from, []);
        }
        this.edges.get(from).push({ node: to, weight });
        
        // For undirected graph, add reverse edge
        if (!this.edges.has(to)) {
            this.edges.set(to, []);
        }
        this.edges.get(to).push({ node: from, weight });
    }

    dijkstra(startNode, endNode) {
        // Reset all nodes
        for (let [name, node] of this.nodes) {
            node.distance = Infinity;
            node.visited = false;
            node.previous = null;
        }

        // Set start node distance to 0
        this.nodes.get(startNode).distance = 0;

        const unvisited = new Set(this.nodes.keys());

        while (unvisited.size > 0) {
            // Find unvisited node with minimum distance
            let current = null;
            let minDistance = Infinity;

            for (let nodeName of unvisited) {
                const node = this.nodes.get(nodeName);
                if (node.distance < minDistance) {
                    current = nodeName;
                    minDistance = node.distance;
                }
            }

            if (current === null || minDistance === Infinity) break;
            if (current === endNode) break;

            unvisited.delete(current);
            const currentNode = this.nodes.get(current);
            currentNode.visited = true;

            // Update distances to neighbors
            const neighbors = this.edges.get(current) || [];
            for (let neighbor of neighbors) {
                if (!unvisited.has(neighbor.node)) continue;

                const neighborNode = this.nodes.get(neighbor.node);
                const newDistance = currentNode.distance + neighbor.weight;

                if (newDistance < neighborNode.distance) {
                    neighborNode.distance = newDistance;
                    neighborNode.previous = current;
                }
            }
        }

        return this.getPath(startNode, endNode);
    }

    getPath(startNode, endNode) {
        const path = [];
        let current = endNode;

        while (current !== null) {
            path.unshift(current);
            current = this.nodes.get(current).previous;
        }

        if (path[0] !== startNode) {
            return { path: [], distance: Infinity, found: false };
        }

        return {
            path,
            distance: this.nodes.get(endNode).distance,
            found: true
        };
    }
}

class PathFinderApp {
    constructor() {
        this.graph = new Graph();
        this.setupSampleNetwork();
    }

    setupSampleNetwork() {
        // Create a sample delivery network
        const locations = [
            'Warehouse', 'Downtown', 'Airport', 'University', 
            'Hospital', 'Mall', 'Station', 'Park'
        ];

        // Add nodes with coordinates (for visualization)
        const coordinates = {
            'Warehouse': { x: 0, y: 0 },
            'Downtown': { x: 2, y: 3 },
            'Airport': { x: 5, y: 1 },
            'University': { x: 3, y: 5 },
            'Hospital': { x: 1, y: 4 },
            'Mall': { x: 4, y: 2 },
            'Station': { x: 6, y: 4 },
            'Park': { x: 2, y: 1 }
        };

        locations.forEach(loc => {
            this.graph.addNode(loc, coordinates[loc]);
        });

        // Add edges with distances (in km)
        this.graph.addEdge('Warehouse', 'Downtown', 3.5);
        this.graph.addEdge('Warehouse', 'Park', 2.1);
        this.graph.addEdge('Warehouse', 'Mall', 4.2);
        this.graph.addEdge('Downtown', 'Hospital', 1.8);
        this.graph.addEdge('Downtown', 'University', 2.5);
        this.graph.addEdge('Downtown', 'Park', 2.0);
        this.graph.addEdge('Park', 'Mall', 2.3);
        this.graph.addEdge('Mall', 'Airport', 3.1);
        this.graph.addEdge('Mall', 'Station', 2.8);
        this.graph.addEdge('Airport', 'Station', 3.5);
        this.graph.addEdge('University', 'Station', 3.2);
        this.graph.addEdge('University', 'Hospital', 2.7);
        this.graph.addEdge('Hospital', 'Station', 4.1);
    }

    findShortestRoute(from, to) {
        console.log(`\n🚚 Finding shortest route from ${from} to ${to}...`);
        
        const result = this.graph.dijkstra(from, to);
        
        if (!result.found) {
            console.log(`❌ No route found from ${from} to ${to}`);
            return null;
        }

        console.log(`✅ Route found! Total distance: ${result.distance.toFixed(1)} km`);
        console.log(`📍 Path: ${result.path.join(' → ')}`);
        
        return result;
    }

    displayNetwork() {
        console.log('\n📍 Available Locations:');
        for (let [name, node] of this.graph.nodes) {
            console.log(`  • ${name} (${node.coordinates.x}, ${node.coordinates.y})`);
        }
    }

    runInteractiveMode() {
        console.log('🗺️  PathFinder - Shortest Route Calculator');
        console.log('==========================================');
        
        this.displayNetwork();
        
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const askQuestion = (question) => {
            return new Promise((resolve) => {
                rl.question(question, resolve);
            });
        };

        const mainLoop = async () => {
            while (true) {
                console.log('\n' + '='.repeat(50));
                const from = await askQuestion('Enter starting location (or "quit"): ');
                
                if (from.toLowerCase() === 'quit') {
                    console.log('👋 Goodbye!');
                    rl.close();
                    break;
                }

                if (!this.graph.nodes.has(from)) {
                    console.log(`❌ Location "${from}" not found. Please try again.`);
                    continue;
                }

                const to = await askQuestion('Enter destination location: ');
                
                if (!this.graph.nodes.has(to)) {
                    console.log(`❌ Location "${to}" not found. Please try again.`);
                    continue;
                }

                this.findShortestRoute(from, to);
            }
        };

        mainLoop().catch(console.error);
    }

    runDemo() {
        console.log('🗺️  PathFinder - Demo Mode');
        console.log('==========================');
        
        this.displayNetwork();
        
        // Demo routes
        const demoRoutes = [
            ['Warehouse', 'Airport'],
            ['Hospital', 'Mall'],
            ['University', 'Park'],
            ['Station', 'Warehouse']
        ];

        demoRoutes.forEach(([from, to]) => {
            this.findShortestRoute(from, to);
        });

        console.log('\n🎯 Algorithm Analysis:');
        console.log('• Time Complexity: O(V²) where V = number of vertices');
        console.log('• Space Complexity: O(V + E) where E = number of edges');
        console.log('• This implementation uses Dijkstra\'s algorithm with adjacency list');
        console.log('• Optimal for finding shortest paths in weighted graphs with non-negative edges');
    }
}

// Command line interface
if (require.main === module) {
    const app = new PathFinderApp();
    
    const args = process.argv.slice(2);
    
    if (args.includes('--demo') || args.includes('-d')) {
        app.runDemo();
    } else if (args.includes('--interactive') || args.includes('-i')) {
        app.runInteractiveMode();
    } else {
        console.log('🗺️  PathFinder - Shortest Route Calculator');
        console.log('Usage:');
        console.log('  node pathfinder_app.js --demo       Run demo mode');
        console.log('  node pathfinder_app.js --interactive Run interactive mode');
        console.log('');
        app.runDemo();
    }
}

module.exports = { Graph, PathFinderApp };
