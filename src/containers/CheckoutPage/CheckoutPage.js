import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAddress } from '../../actions/actions'
import Layout from '../../components/Layout/Layout'
import { MaterialButton, MaterialInput } from '../../components/Material UI'
import AddressForm from './AddressForm'
import "./CheckoutPage.css"
const CheckoutStep = (props) => {

    return (
        <div className="checkoutStep">
            <div className={`checkoutHeader ${props.active && 'active'}`} onClick={props.onClick}>
                <div>
                    <span className="stepNumber">{props.stepNumber}</span>
                    <span className="stepTitle">{props.title}</span>
                </div>
            </div>
            {props.body && props.body}
        </div>
    )
}

const CheckoutPage = (props)=>{
    const user = useSelector(state => state.user);
    const auth = useSelector(state => state.auth);
    const [newAddress, setNewAddress] = useState(false);
    const [address, setAddress] = useState([]);

    const [confirmAddress, setConfirmAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const dispatch = useDispatch();

    const onAddressSubmit = ()=>{
    }
    useEffect(()=>{
        auth.authenticate && dispatch(getAddress());
    },[auth.authenticate]);

    useEffect(()=>{
        const _address = user.address.map(adr => ({...adr,selected:false,edit: false}))
        setAddress(_address);
    },[user.address])

    const confirmDeliveryAddress = (addr)=>{
        setSelectedAddress(addr);
        setConfirmAddress(true);
    }

    const selectAddress = (addr)=>{
        const _address = address.map(adr => adr._id === addr._id? {...adr,selected: true}: {...adr,selected: false});
        setAddress(_address)
    }
    return (
        <Layout>
            <div className="cartContainer" style={{alignItems: 'center'}}>
                <div className="checkoutContainer"> 
                    <CheckoutStep
                        stepNumber={'1'}
                        title={'LOGIN'}
                        active={!auth.authenticate}
                        body={
                            auth.authenticate? 
                            <div className="loggedInId">
                                <span style={{fontWeight: 500}}>{auth.user.fullName}</span>
                                <span style={{margin: '0 5px'}}>{auth.user.email}</span>
                            </div>
                            : <MaterialInput label="Email"/>

                        }
                    />

                    <CheckoutStep
                        stepNumber={'2'}
                        title={'DELIVERY ADDRESS'}
                        active={!confirmAddress}
                        body={
                            <>
                                {
                                    confirmAddress? 
                                    <div>
                                        {selectedAddress.toString()}
                                    </div>
                                    :address.map(adr =>
                                    (<div className="flexRow addressConatiner" key={adr._id}>
                                        <div>
                                            <input type="radio" name="address" onClick={()=> selectAddress(adr)}/>
                                        </div>
                                        <div className="flexRow sb addressinfo">
                                            <div>
                                                <div>
                                                    <span>{adr.name}</span>
                                                    <span>{adr.addressType}</span>
                                                    <span>{adr.mobileNumber}</span>
                                                </div>
                                                <div>
                                                    {adr.address}
                                                </div>
                                                {adr.selected && (
                                                <MaterialButton
                                                    title="DELIVER HERE"
                                                    onClick={()=> confirmDeliveryAddress(adr)}
                                                    style={{
                                                        width: '250px'
                                                    }}
                                                />
                                                )}
                                            </div>
                                            {adr.selected && <div>Edit</div>}
                                        </div>
                                    </div>)
                                    )
                                }
                            </>
                        }
                    />
                    
                    {
                        !confirmAddress ? auth.authenticate && newAddress ? <AddressForm onClick={onAddressSubmit}/>: <CheckoutStep
                        stepNumber={'+'}
                        title={'ADD NEW ADDERSS'}
                        active={false}
                        onClick={()=> setNewAddress(true)}
                    />:null
                    }
                    
                </div>
            </div>
        </Layout>
    )
}

export default CheckoutPage;