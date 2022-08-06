varying vec2 vUv; 

uniform float uGradient; 


void main()	{
    vec3 color = vec3(0.);
    float alpha = 0.;

    // Circle
    float circle = distance(vUv, vec2(0.5));
    circle = smoothstep(0.493, 0.498, circle);

    alpha = circle * 0.4; 

    // Color
    color = vec3(vUv, 1.);
    color = vec3(smoothstep(uGradient, 1.,vUv.x)) + vec3(smoothstep(uGradient, 1.,vUv.y)) * 0.3;
    color *= vec3(1., 0., 0.);

    gl_FragColor = vec4(color, alpha);
}