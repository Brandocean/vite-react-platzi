import { useContext } from "react"

import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid'

import { ShoppingCartContext } from "../../Context"

const Card = ({ data }) => {

    const {
        count,
        setCount,
        openProductDetail,
        closeProductDetail,
        setProductToShow,
        cartProducts,
        setCartProducts,
        openCheckoutSideMenu
    } = useContext(ShoppingCartContext)

    const showProduct = (product) => {
        openProductDetail()
        setProductToShow(product)
    }

    const addProduct = (event, product) => {
        event.stopPropagation()
        setCount(count + 1)
        setCartProducts([...cartProducts, product])
        openCheckoutSideMenu()
        closeProductDetail()
    }

    const renderIcon = (id) => {

        const isInCart = cartProducts.filter(product => product.id === id).length > 0

        if (isInCart) {
            return (
                <button
                    className='absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1'
                >
                    <CheckIcon className="h-6 w-6 text-white"></CheckIcon>
                </button>
            )
        } else {
            return (
                <button
                    className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1'
                    onClick={(event) => addProduct(event, data)}
                >
                    <PlusIcon className="h-6 w-6 text-black"></PlusIcon>
                </button>
            )
        }

    }

    return (
        <div
            className='bg-white cursor-pointer w-56 h-60 rounded-lg'
            onClick={() => showProduct(data)}
        >
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">{data.category}</span>
                <img
                    className='w-full h-full object-cover rounded-lg'
                    src={data.image}
                    // src='https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    alt={data.title}
                />
                { renderIcon(data.id) }
            </figure>
            <p className='flex justify-between'>
                <span className="text-sm font-light">{data.title}</span>
                <span className="text-lg font-medium">${data.price}</span>
            </p>
        </div>
    )
}

export default Card