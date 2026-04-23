import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <AdminGuard>
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[var(--color-text)]">
              Nouveau produit
            </h1>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mt-1">
              Remplissez les informations du produit puis ajoutez une photo.
            </p>
          </div>
          <ProductForm mode="create" />
        </div>
      </main>
    </AdminGuard>
  );
}
