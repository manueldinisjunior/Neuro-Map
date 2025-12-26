export const generateMockData = (count = 50) => {
    const nodes = [];
    const links = [];
    const categories = ['Work', 'Personal', 'Development', 'Ideas', 'Reading'];

    // Root node
    nodes.push({ id: 'root', name: 'My Mind', val: 20, color: '#2563eb' });

    for (let i = 0; i < count; i++) {
        const id = `node-${i}`;
        const category = categories[Math.floor(Math.random() * categories.length)];
        const val = Math.random() * 10 + 2;

        nodes.push({
            id,
            name: `Topic ${i + 1}`,
            category,
            val,
            color: category === 'Work' ? '#ef4444' :
                category === 'Personal' ? '#10b981' :
                    category === 'Development' ? '#8b5cf6' :
                        category === 'Ideas' ? '#f59e0b' : '#6366f1'
        });

        // Random connection
        const target = nodes[Math.floor(Math.random() * (nodes.length - 1))].id;
        links.push({
            source: id,
            target: target
        });
    }

    return { nodes, links };
};
