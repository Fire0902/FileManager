
interface LoginLayoutProps {
    login: string;
    setLogin: (value: string) => void;
    visiblePassword: string;
    setVisiblePassword: (value: string) => void;
}

function LoginLayout({ login, setLogin, visiblePassword, setVisiblePassword }: LoginLayoutProps) {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ width: '15%' }}>
                <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating w-100">
                    <input type="username" value={login} onChange={(e) => setLogin(e.target.value)} className="form-control" id="floatingInput" placeholder="JohnDoe" />
                    <label htmlFor="floatingInput">Login</label>
                </div>
                <div className="form-floating w-100">
                    <input type="password" value={visiblePassword} onChange={(e) => setVisiblePassword(e.target.value)} className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Remember me
                    </label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-body-secondary">&copy; 2025</p>
            </div>
        </div>

    );
}
export default LoginLayout;