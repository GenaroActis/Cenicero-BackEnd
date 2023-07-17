const addProduct = async (prodId) =>{
    try {
        const response = await fetch(`/api/carts/${prodId}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            await response.json();
        } else {
            window.location.href = '/views/login'
            throw new Error('Error en la solicitud');
        }
    } catch (error) {
        console.log(error)
    }
};




