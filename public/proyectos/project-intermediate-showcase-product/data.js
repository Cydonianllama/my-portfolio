var products = [
    {
        id: 'product-1',
        urlImages: ['/project-resources/project-intermediate-showcase-product//resources/images/polorojo.jpg'],
        type: 0,
        name: 'polo rojo',
        unitaryPrice: 15,
        offert: 15,
        idSeller: 'seller-1',
        description: 'this is red',
        sizing: [
            {
                size: 'small',
                quantity: 15,
            },
            {
                size: 'medium',
                quantity: 2
            },
            {
                size: 'large',
                quantity: 3
            }
        ],
        shipping: {
            methods: [
                {
                    type: 'rappi',
                    price: 18
                },
                {
                    type: 'local',
                    price: 0
                },
                {
                    type: 'civa',
                    price: 10
                }
            ]
        }
    },
    {
        id: 'product-2',
        urlImages: ['/project-resources/project-intermediate-showcase-product//resources/images/polonaranja.jpg'],
        type: 0,
        name: 'polo naranja',
        unitaryPrice: 10,
        offert: 15,
        idSeller: 'seller-1',
        description: 'this is orange',
        sizing: [
            {
                size: 'small',
                quantity: 25,
            },
            {
                size: 'medium',
                quantity: 3
            },
            {
                size: 'large',
                quantity: 5
            }
        ],
        shipping: {
            methods: [

                {
                    type: 'rappi',
                    price: 20
                },
                {
                    type: 'local',
                    price: 0
                },
                {
                    type: 'civa',
                    price: 13
                }

            ]
        }
    },
    {
        id: 'product-3',
        urlImages: ['/project-resources/project-intermediate-showcase-product//resources/images/jean1.jpg'],
        type: 1,
        name: 'jean 1',
        unitaryPrice: 45,
        offert: 15,
        idSeller: 'seller-1',
        description: 'this is a jean',
        sizing: [
            {
                size: '18',
                quantity: 25,
            },
            {
                size: '23',
                quantity: 3
            },
            {
                size: '28',
                quantity: 5
            }
        ],
        shipping: {
            methods: [

                {
                    type: 'rappi',
                    price: 8
                },
                {
                    type: 'local',
                    price: 0
                },
                {
                    type: 'civa',
                    price: 18
                }

            ]
        }
    },
    {
        id: 'product-4',
        urlImages: ['/project-resources/project-intermediate-showcase-product//resources/images/jean2.jpg'],
        type: 1,
        name: 'jean 3',
        unitaryPrice: 55,
        offert: 15,
        idSeller: 'seller-1',
        description: 'this is a jean',
        sizing: [
            {
                size: '18',
                quantity: 15,
            },
            {
                size: '23',
                quantity: 3
            },
            {
                size: '28',
                quantity: 15
            }
        ],
        shipping: {
            methods: [

                {
                    type: 'rappi',
                    price: 5
                },
                {
                    type: 'local',
                    price: 0
                },
                {
                    type: 'civa',
                    price: 15
                }

            ]
        }
    }
]

// user 
var user = [
    {
        id: 'id-user-1',
        fullname: 'erick grandez',
    }
]

// propduct in bucket
var bucket = [
    {
        id: 'bucket-1',
        idProduct: 'product-1',
        quantity: 3,
        meassurement: {
            size: 'small'
        },
        shipping: {

        }
    }
]