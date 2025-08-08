import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Building2, MapPin, Star, Wifi, Car, Coffee, Tv, Bath, Bed, Users, Calendar, Shield, Phone, Mail, Clock, ExternalLink, Quote, ChevronRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function DepartamentosPlazaLanding() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center gap-3">
          <Image
            src="/images/logo-departamentos-plaza.png"
            alt="Departamentos Plaza"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <div className="flex flex-col">
            <span className="font-bold text-lg">Departamentos Plaza</span>
            <span className="text-xs text-muted-foreground">Santo Tomé - Santa Fe</span>
          </div>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#galeria" className="text-sm font-medium hover:text-primary transition-colors">
            Galería
          </Link>
          <Link href="#ubicacion" className="text-sm font-medium hover:text-primary transition-colors">
            Ubicación
          </Link>
          <Link href="#servicios" className="text-sm font-medium hover:text-primary transition-colors">
            Servicios
          </Link>
          <Link href="#opiniones" className="text-sm font-medium hover:text-primary transition-colors">
            Opiniones
          </Link>
          <Link href="#reservas" className="text-sm font-medium hover:text-primary transition-colors">
            Reservas
          </Link>
          <Link href="#contacto" className="text-sm font-medium hover:text-primary transition-colors">
            Contacto
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-orange-50 via-background to-amber-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary" className="mb-4">
                  Disponible en Booking.com y Airbnb
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Departamentos Plaza
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Alojamiento temporal en el corazón de Santo Tomé, Santa Fe. 
                  Departamentos completamente equipados para estadías cortas y largas.
                </p>
                <p className="text-lg font-medium text-primary">
                  Santo Tomé - Santa Fe - Argentina
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button size="lg" className="gap-2" asChild>
                  <Link href="https://www.booking.com/hotel/ar/departamento-plaza-santo-tome-sta-fe.es.html?aid=356980&label=gog235jc-10CAsoDEIkZGVwYXJ0YW1lbnRvLXBsYXphLXNhbnRvLXRvbWUtc3RhLWZlSCxYA2gMiAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBqAIBuAKtuNnEBsACAdICJDMzYzUyMjgxLTE1ZDYtNDE4Zi05ZTI2LWM3OWIyM2ZlNDZiMNgCAeACAQ&sid=b024d5f1311f3e45ce4b82ceabd8d2b7&dest_id=-1015233&dest_type=city&dist=0&group_adults=6&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=6&req_children=0&room1=A%2CA%2CA%2CA%2CA%2CA&sb_price_type=total&sr_order=popularity&srepoch=1754684471&srpvid=0f8b8f174df30174&type=total&ucfs=1&" target="_blank">
                    <ExternalLink className="w-4 h-4" />
                    Reservar en Booking.com
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="gap-2" asChild>
                  <Link href="https://es-l.airbnb.com/rooms/1146271696337650454?source_impression_id=p3_1754684881_P3NgfTZEdWEYuEuw" target="_blank">
                    <ExternalLink className="w-4 h-4" />
                    Ver en Airbnb
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">Excelente ubicación</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>Anfitrión verificado</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section id="galeria" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Nuestros Departamentos
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Espacios cómodos y modernos, completamente equipados para tu estadía.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {/* Main Living Area */}
              <Card className="overflow-hidden">
                <div className="relative">
                  <Image
                    src="/images/foto-principal.jpg"
                    alt="Sala de estar y comedor - Departamentos Plaza"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <Badge className="absolute top-4 left-4">Sala Principal</Badge>
                </div>
              </Card>

              {/* Bedroom */}
              <Card className="overflow-hidden">
                <div className="relative">
                  <Image
                    src="/images/habitacion.jpg"
                    alt="Habitación - Departamentos Plaza"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <Badge className="absolute top-4 left-4" variant="secondary">Habitación</Badge>
                </div>
              </Card>

              {/* Kitchen */}
              <Card className="overflow-hidden">
                <div className="relative">
                  <Image
                    src="/images/cocina.jpg"
                    alt="Cocina equipada - Departamentos Plaza"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <Badge className="absolute top-4 left-4" variant="secondary">Cocina</Badge>
                </div>
              </Card>
            </div>

            {/* Ver más fotos button */}
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="gap-2">
                Ver más fotos
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Servicios Incluidos
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Todos nuestros departamentos cuentan con servicios completos para garantizar tu comodidad.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wifi className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">WiFi Gratuito</h3>
                <p className="text-sm text-muted-foreground">Internet de alta velocidad en todos los departamentos</p>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Cocina Completa</h3>
                <p className="text-sm text-muted-foreground">Cocina equipada con todos los electrodomésticos</p>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Tv className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Televisión</h3>
                <p className="text-sm text-muted-foreground">Televisión disponible en todos los departamentos</p>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Estacionamiento</h3>
                <p className="text-sm text-muted-foreground">Lugar de estacionamiento seguro disponible</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="opiniones" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Opiniones de Nuestros Huéspedes
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Lo que dicen quienes ya se hospedaron con nosotros.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {/* Testimonial 1 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Quote className="w-8 h-8 text-primary/20 flex-shrink-0 mt-1" />
                    <div className="space-y-4">
                      <p className="text-muted-foreground italic">
                        "Excelente departamento, muy limpio y cómodo. La ubicación es perfecta, 
                        cerca de todo lo que necesitás en Santo Tomé. Los anfitriones son muy 
                        atentos y siempre dispuestos a ayudar. Sin dudas volvería a hospedarme aquí."
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <div className="text-sm">
                          <p className="font-semibold">María González</p>
                          <p className="text-muted-foreground">Rosario, Argentina</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 2 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Quote className="w-8 h-8 text-primary/20 flex-shrink-0 mt-1" />
                    <div className="space-y-4">
                      <p className="text-muted-foreground italic">
                        "Nos hospedamos por trabajo durante una semana y fue como estar en casa. 
                        El departamento tiene todo lo necesario, muy buena conexión a internet 
                        para trabajar y la cocina completamente equipada. Recomendable 100%."
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <div className="text-sm">
                          <p className="font-semibold">Carlos Mendoza</p>
                          <p className="text-muted-foreground">Buenos Aires, Argentina</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="ubicacion" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ubicación Privilegiada
                  </h2>
                  <p className="text-muted-foreground md:text-xl">
                    Ubicados en el centro de Santo Tomé, con fácil acceso a comercios, 
                    servicios y principales atracciones de la ciudad.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Centro de Santo Tomé</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>Cerca de comercios y servicios</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-primary" />
                    <span>Fácil acceso desde rutas principales</span>
                  </div>
                </div>
                
                <Button className="gap-2" asChild>
                  <Link href="https://www.google.com/maps/place/31%C2%B039'50.7%22S+60%C2%B045'41.5%22W/@-31.6640553,-60.761814,211m/data=!3m1!1e3!4m4!3m3!8m2!3d-31.6640701!4d-60.7615318?entry=ttu&g_ep=EgoyMDI1MDgwNS4wIKXMDSoASAFQAw%3D%3D" target="_blank">
                    <MapPin className="w-4 h-4" />
                    Ver en Google Maps
                  </Link>
                </Button>
              </div>
              
              <div className="relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211.0!2d-60.7615318!3d-31.6640701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM5JzUwLjciUyA2MMKwNDUnNDEuNSJX!5e0!3m2!1ses!2sar!4v1234567890"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Booking CTA Section */}
        <section id="reservas" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  ¿Listo para Reservar?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                  Reserva directamente a través de nuestras plataformas de confianza 
                  para obtener las mejores tarifas y confirmación instantánea.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button size="lg" variant="secondary" className="gap-2" asChild>
                  <Link href="https://www.booking.com/hotel/ar/departamento-plaza-santo-tome-sta-fe.es.html?aid=356980&label=gog235jc-10CAsoDEIkZGVwYXJ0YW1lbnRvLXBsYXphLXNhbnRvLXRvbWUtc3RhLWZlSCxYA2gMiAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBqAIBuAKtuNnEBsACAdICJDMzYzUyMjgxLTE1ZDYtNDE4Zi05ZTI2LWM3OWIyM2ZlNDZiMNgCAeACAQ&sid=b024d5f1311f3e45ce4b82ceabd8d2b7&dest_id=-1015233&dest_type=city&dist=0&group_adults=6&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=6&req_children=0&room1=A%2CA%2CA%2CA%2CA%2CA&sb_price_type=total&sr_order=popularity&srepoch=1754684471&srpvid=0f8b8f174df30174&type=total&ucfs=1&" target="_blank">
                    <ExternalLink className="w-4 h-4" />
                    Reservar en Booking.com
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                  <Link href="https://es-l.airbnb.com/rooms/1146271696337650454?source_impression_id=p3_1754684881_P3NgfTZEdWEYuEuw" target="_blank">
                    <ExternalLink className="w-4 h-4" />
                    Reservar en Airbnb
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Only Contact Info */}
        <section id="contacto" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Contactanos
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                ¿Tenés preguntas sobre nuestros departamentos? Estamos aquí para ayudarte.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-lg">+54 9 342 XXX-XXXX</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-lg">info@departamentosplaza.com</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-lg">Santo Tomé, Santa Fe, Argentina</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2024 Departamentos Plaza. Todos los derechos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Términos de Servicio
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Política de Privacidad
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Política de Cancelación
          </Link>
        </nav>
      </footer>
    </div>
  )
}
