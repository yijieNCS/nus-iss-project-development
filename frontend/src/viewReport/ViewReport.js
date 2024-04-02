import { SideBar } from "../common/sidebar/SideBar";
import { Header } from "../common/header/Header";
import classes from './ViewReport.module.css'

const viewReportIcon = () => {
    return ( 
        <div className={classes["grid-container"]}>
            <Header/>
            <SideBar/>
            <main className={classes["content"]}>
            <div className={classes["reportcontainer"]}>
                <h2 className={classes["titlereport"]}>
                    Reported by User x
                </h2>
                <div className={classes["reporteduserContainer"]}>
                    <div >
                        <img src='/icons/warningIcon.png' alt="Report Icon"/>
                    </div>
                    <div className={classes["divider"]}></div>
                    <input className={classes["reporteduserContainer-input"]} type="text" name="reportuser" placeholder="Report User"/>        
                </div>
                <div className={classes["reportdescContainer"]}>
                    <h3><label for="reportbox">Report Description:</label></h3>
                    <textarea id="reportbox" name="reportbox"></textarea>
                </div> 
              </div>
            </main>
        </div>
     );
}
 
export default viewReportIcon;