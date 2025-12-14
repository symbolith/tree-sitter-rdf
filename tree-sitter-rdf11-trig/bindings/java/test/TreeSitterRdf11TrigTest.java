import io.github.treesitter.jtreesitter.Language;
import io.github.treesitter.jtreesitter.rdf11trig.TreeSitterRdf11Trig;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TreeSitterRdf11TrigTest {
    @Test
    public void testCanLoadLanguage() {
        assertDoesNotThrow(() -> new Language(TreeSitterRdf11Trig.language()));
    }
}
