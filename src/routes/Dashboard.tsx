import Card from './../components/ui/Card.tsx';

export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            <div className="sm:col-span-2 lg:col-span-2">
                <Card>
                    Welcome to BrightSteps — your personal habit tracker to build better routines, one step at a time.
                </Card>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
                <Card>
                    This is going to be another card
                </Card>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
                <Card>
                    Goals summary
                </Card>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
                <Card>
                    Tip of the day
                </Card>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
                <Card>
                    Inspiration
                </Card>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
                <Card>
                    Mentors
                </Card>
            </div>
        </div>
    );
}
