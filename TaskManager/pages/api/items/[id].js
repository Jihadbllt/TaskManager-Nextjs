export default function handler(req, res){
    const {id} = req.query;
    const itemId = parseInt(id);

    if (req.method == 'PUT'){
        const {name, description} = req.body;
        const itemIndex = items.findIndex((item) => item.id === itemId);
        if (itemIndex === -1){
            return res.status(404).json({message: 'Item not found'});
        }
        items[itemIndex] = {...items[itemIndex], name, description};
        res.status(200).json(items[itemIndex]);
    } else if (req.method == 'DELETE'){
        const itemIndex = items.findIndex((item) => item.id === itemId);
        if (itemIndex === -1){
            return res.status(404).json({message: 'item not found'});
        }
        items.splice(itemIndex, 1);
        res.status(204).end();
    } else {
        res.status(405).json({ message: 'Method not allowed or valid'});
    }
}