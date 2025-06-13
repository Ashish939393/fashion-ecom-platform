"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AccountLayout from "@/components/account-layout"
import { Plus, Edit, Trash2, Home, Briefcase } from "lucide-react"

// Sample addresses data
const initialAddresses = [
  {
    id: "1",
    name: "John Doe",
    type: "home",
    street: "123 Fashion Street",
    city: "Style City",
    state: "SC",
    zip: "12345",
    country: "United States",
    phone: "+1 (555) 123-4567",
    isDefault: true,
  },
  {
    id: "2",
    name: "John Doe",
    type: "work",
    street: "456 Business Avenue",
    city: "Commerce City",
    state: "CC",
    zip: "67890",
    country: "United States",
    phone: "+1 (555) 987-6543",
    isDefault: false,
  },
]

export default function AddressesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [addresses, setAddresses] = useState(initialAddresses)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<(typeof addresses)[0] | null>(null)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    type: "home",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    phone: "",
    isDefault: false,
  })

  if (!user) {
    router.push("/login")
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddAddress = () => {
    const newAddress = {
      ...formData,
      id: `address_${Date.now()}`,
    }

    // If this is the first address or marked as default, update other addresses
    if (addresses.length === 0 || formData.isDefault) {
      setAddresses((prev) =>
        prev.map((address) => ({
          ...address,
          isDefault: false,
        })),
      )
    }

    setAddresses((prev) => [...prev, newAddress])
    setIsAddDialogOpen(false)
    resetForm()

    toast.success("Your new address has been added successfully")
  }

  const handleEditAddress = () => {
    if (!currentAddress) return

    setAddresses((prev) =>
      prev.map((address) => {
        // Update the current address
        if (address.id === currentAddress.id) {
          return { ...formData }
        }

        // If the edited address is now default, remove default from others
        if (formData.isDefault) {
          return {
            ...address,
            isDefault: false,
          }
        }

        return address
      }),
    )

    setIsEditDialogOpen(false)
    resetForm()

    toast.success("Your address has been updated successfully")
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((address) => address.id !== id))

    toast.success("Your address has been deleted successfully")
  }

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    )

    toast.success("Your default address has been updated successfully")
  }

  const editAddress = (address: (typeof addresses)[0]) => {
    setCurrentAddress(address)
    setFormData(address)
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      type: "home",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
      phone: "",
      isDefault: false,
    })
    setCurrentAddress(null)
  }

  const openAddDialog = () => {
    resetForm()
    setIsAddDialogOpen(true)
  }

  const AddressForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Address Type</Label>
          <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home">Home</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="street">Street Address</Label>
        <Input id="street" name="street" value={formData.street} onChange={handleChange} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State/Province</Label>
          <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="zip">ZIP/Postal Code</Label>
          <Input id="zip" name="zip" value={formData.zip} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="United States">United States</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="France">France</SelectItem>
              <SelectItem value="Japan">Japan</SelectItem>
              <SelectItem value="China">China</SelectItem>
              <SelectItem value="India">India</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isDefault"
          checked={formData.isDefault}
          onChange={(e) => setFormData((prev) => ({ ...prev, isDefault: e.target.checked }))}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
        <Label htmlFor="isDefault" className="text-sm font-normal">
          Set as default address
        </Label>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => (isEdit ? setIsEditDialogOpen(false) : setIsAddDialogOpen(false))}>
          Cancel
        </Button>
        <Button onClick={isEdit ? handleEditAddress : handleAddAddress}>
          {isEdit ? "Update Address" : "Add Address"}
        </Button>
      </div>
    </div>
  )

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Addresses</h1>
            <p className="text-muted-foreground">Manage your shipping and billing addresses.</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <Plus className="h-4 w-4 mr-2" /> Add Address
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
              </DialogHeader>
              <AddressForm />
            </DialogContent>
          </Dialog>
        </div>

        {addresses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <Card key={address.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    {address.type === "home" ? (
                      <Home className="h-4 w-4 mr-2" />
                    ) : address.type === "work" ? (
                      <Briefcase className="h-4 w-4 mr-2" />
                    ) : null}
                    {address.type.charAt(0).toUpperCase() + address.type.slice(1)} Address
                    {address.isDefault && (
                      <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{address.name}</p>
                    <p>{address.street}</p>
                    <p>
                      {address.city}, {address.state} {address.zip}
                    </p>
                    <p>{address.country}</p>
                    <p>{address.phone}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div>
                    {!address.isDefault && (
                      <Button variant="ghost" size="sm" onClick={() => handleSetDefault(address.id)}>
                        Set as Default
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => editAddress(address)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Edit Address</DialogTitle>
                        </DialogHeader>
                        <AddressForm isEdit />
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <h3 className="text-lg font-medium mb-2">No addresses found</h3>
            <p className="text-muted-foreground mb-4">You haven't added any addresses yet.</p>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openAddDialog}>
                  <Plus className="h-4 w-4 mr-2" /> Add Address
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Address</DialogTitle>
                </DialogHeader>
                <AddressForm />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </AccountLayout>
  )
}
