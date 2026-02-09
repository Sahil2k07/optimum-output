import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ManageProductRequest, Product } from "@/types/product";

type ProductFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSubmit: (data: ManageProductRequest) => void;
};

function ProductForm({
  open,
  onOpenChange,
  product,
  onSubmit,
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
        image: product.image,
      });
    } else {
      // Reset form for new product
      setFormData({
        title: "",
        description: "",
        price: "",
        stock: "",
        image: "",
      });
    }
  }, [product, open]);

  const handleSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();

    onSubmit({
      id: product?.id,
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      image: formData.image,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {product
              ? "Update the product details below"
              : "Fill in the details to create a new product"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Product name"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Product description"
                rows={3}
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="0.00"
                required
              />
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                placeholder="0"
                required
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {product ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ProductForm;
