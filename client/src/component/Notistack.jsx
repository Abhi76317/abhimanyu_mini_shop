import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { useEffect } from "react";
export default function Notistack() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const alertsState = useSelector((state) => state.alertState);
  useEffect(()=>{
    console.log('alert', alertsState)
    if(!isEmpty(alertsState)){
      enqueueSnackbar(alertsState.message,alertsState)
    }
  },[alertsState])

  return (
    <></>
  );
}
