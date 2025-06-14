import { Trans, useTranslation } from 'react-i18next';
import PageTitle from './../components/ui/PageTitle.tsx';

export default function About() {
    const { t } = useTranslation();
    const features = t('about.features.list', { returnObjects: true }) as string[];

    return (
        <>
            <div className="max-w-5xl mx-auto px-6 py-10 rounded-xl shadow-md bg-[var(--color-container)]">
                <PageTitle title={t('about.title')} />

                <h2 className="text-xl font-semibold mb-4">{t('about.welcome')}</h2>
                <p className="text-base leading-relaxed mb-4">
                    <Trans i18nKey="about.intro1" components={{ strong: <strong /> }} />
                </p>
                <p className="text-base leading-relaxed mb-4">
                    <Trans i18nKey="about.note" components={{ strong: <strong /> }} />
                </p>
                <p className="text-base leading-relaxed mb-4">
                    {t('about.intro2')}
                </p>

                <p className="text-base leading-relaxed mb-4">
                    <Trans
                        i18nKey="about.connect"
                        components={{
                            0: (
                                <a
                                    href="https://www.linkedin.com/in/seu-perfil"
                                    className="text-blue-600 hover:underline focus:outline-none focus:ring focus:ring-blue-400 rounded"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                />
                            ),
                        }}
                    />
                </p>

                <ul className="list-disc ml-6 space-y-2 text-base leading-relaxed">
                    {features.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
                </>
    );
}
