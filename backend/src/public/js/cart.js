const deleteProduct = async (prodId) =>{
    try {
        const response = await fetch(`/api/carts/${prodId}`, {
            method: 'DELETE',
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
        location.reload();
    } catch (error) {
        console.log(error)
    }
};
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
        location.reload();
    } catch (error) {
        console.log(error)
    }
};
const deleteAllProducts = async () =>{
    try {
        const response = await fetch(`/api/carts/all`, {
            method: 'DELETE',
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
        location.reload();
    } catch (error) {
        console.log(error)
    }
}