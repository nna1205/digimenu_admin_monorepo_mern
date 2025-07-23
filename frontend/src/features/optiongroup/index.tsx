import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getOptionGroupByStore } from "./_reducer/optiongroupActions";
import OptionGroupUpdateContainer from "./_components/OptionGroupUpdateForm";
import OptionGroupCreateForm from "./_components/OptionGroupCreateForm";
import DeleteDialog from "./_components/OptionGroupDeleteDialog";

const OptionGroupPage = () => {
  const { id: store_id } = useParams();
  const dispatch = useAppDispatch();
  const { optiongroup, isLoading } = useAppSelector(
    (state) => state.optiongroup
  );

  useEffect(() => {
    dispatch(getOptionGroupByStore(store_id as string));
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (optiongroup?.length > 0) {
    return (
      <div className={`flex flex-col gap-6 mt-3`}>
        <span className={`text-xl font-bold`}>Danh mục lựa chọn món ăn</span>
        <div className={`grid grid-cols-4 gap-3`}>
          {optiongroup.map((group) => {
            return (
              <div
                key={group.id}
                className={`border-2 rounded-xl p-2 min-w-[240px] min-h-[120px]`}
              >
                <div className={`w-full flex justify-between item-center`}>
                  <span className={`text-xl font-bold`}>{group.name}</span>
                  <div className={`flex justify-center items-center gap-3`}>
                    <OptionGroupUpdateContainer optiongroup={group} />
                    <DeleteDialog option_group_id={group.id} />
                  </div>
                </div>
                <span className={``}>{group.can_have_many}</span>
                {group.optionitem && group.optionitem?.length > 0 ? (
                  <div className={`mt-3`}>
                    {group.optionitem.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className={`flex justify-between items-center`}
                        >
                          <span className={``}>{`${item.name}: `}</span>
                          <span className={``}>
                            {parseInt(item.price).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    className={`w-full h-full flex justify-center items-center`}
                  >
                    Thêm lựa chọn
                  </div>
                )}
              </div>
            );
          })}
          <OptionGroupCreateForm />
        </div>
      </div>
    );
  }
};

export default OptionGroupPage;
