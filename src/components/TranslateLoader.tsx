
import "./_style/Style.scss";

function TranslateLoader() {
    return (
        <div className="loader">
            <span className="loader-text">
                Translating
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
            </span>
        </div>
    )
}

export default TranslateLoader;