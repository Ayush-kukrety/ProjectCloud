const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-lightTheme-secondary text-lightTheme-text dark:bg-darkTheme-secondary dark:text-darkTheme-text">
            <div className="text-center">
                <h1 className="text-4xl font-semibold text-red-500 mb-4">404 - Page Not Found</h1>
                <p className="text-lg">{`The page you're looking for doesn't exist.`}</p>
            </div>
        </div>
    );
};
export default NotFound;
