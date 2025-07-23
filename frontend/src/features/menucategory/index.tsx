import { DataTable } from "@/components/ui/data-table";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MenuCategoryCreateForm from "./_components/MenuCategoryCreateForm";
import { getMenuCategories } from "./_reducer/menucategoryActions";
import { columns } from "./tableDefinition";

const MenuCategoryPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { categories, isLoading } = useAppSelector(
    (state) => state.menucategory
  );

  useEffect(() => {
    dispatch(getMenuCategories(id as string));
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (categories && categories.length > 0) {
    return (
      <div className={`flex flex-col gap-3 mt-6`}>
        <span className={`font-bold text-xl`}>Danh sách danh mục món ăn</span>
        <MenuCategoryCreateForm />
        <DataTable columns={columns} data={categories} />
      </div>
    );
  }
  return <div>Cửa hàng chưa có danh mục nào</div>;
};

export default MenuCategoryPage;
