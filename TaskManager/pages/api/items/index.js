let items = [
    { id: 1, name: 'Item 1', description: 'This is Item 1' },
    { id: 2, name: 'Item 2', description: 'This is Item 2' },
];

export default function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            res.status(200).json(items);
            break;

        case 'POST':
            const newItem = { id: items.length + 1, ...req.body };
            items.push(newItem);
            res.status(201).json(newItem);
            break;

        case 'PUT':
            const { id } = req.query;
            const updatedData = req.body;

            const index = items.findIndex(item => item.id === parseInt(id));
            if (index === -1) {
                res.status(404).json({ error: 'Item not found' });
                return;
            }

            
            items[index] = { ...items[index], ...updatedData };
            res.status(200).json(items[index]);
            break;

        case 'DELETE':
            const deleteId = req.query.id;
            items = items.filter(item => item.id !== parseInt(deleteId));
            res.status(204).end();
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
