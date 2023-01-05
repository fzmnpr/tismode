import AddressForm from 'components/shared/forms/AddressForm'
import DrawerModal from 'components/UI/DrawerModal'

function CheckoutAddAddress({ openForm, setOpenForm, setSelectedAddress, user, selectedAddress }) {
  return (
    <DrawerModal open={openForm} setOpen={setOpenForm} title="افزودن آدرس">
      <AddressForm
        setOpenForm={setOpenForm}
        setSelectedAddress={setSelectedAddress}
        selectedAddress={selectedAddress}
        user={user}
      />
    </DrawerModal>
  )
}

export default CheckoutAddAddress
