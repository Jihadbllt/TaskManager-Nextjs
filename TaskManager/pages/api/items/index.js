let item =[
    { id: 1, name: 'Item 1', description: 'This is an item 1'},
    {id: 2, name: 'Item 2', description:'This is an item 2'},
];

export default function handler(req, res){
    if (req.method == 'GET') {
        res.status(200).json(items);
    } else if (req.method == 'POST') {
        const {name, description} = req.body;
        const newItem = {
            id: items.length +1,
            name,
            description,
        };
        items.push(newItem);
        res.status(201).json(newItem);
    } else {
        res.status(405).json({message: 'Method not allowed or not valid'});
    }
}